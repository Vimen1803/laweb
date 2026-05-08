import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: 'identify guilds' } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.discordId = profile?.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.discordId = token.discordId;
      session.isAdmin = false;

      // Explicit override for requested Discord ID
      if (['523883024106913813'].includes(token.discordId)) {
        session.isAdmin = true;
      }

      // Only check admin for other users if we have all required info
      const guildId = process.env.DISCORD_GUILD_ID;
      const botToken = process.env.DISCORD_BOT_TOKEN;
      if (!session.isAdmin && guildId && botToken && token.discordId) {
        try {
          const res = await fetch(
            `https://discord.com/api/v10/guilds/${guildId}/members/${token.discordId}`,
            { headers: { Authorization: `Bot ${botToken}` } }
          );
          if (res.ok) {
            const member = await res.json();
            const guildRes = await fetch(
              `https://discord.com/api/v10/guilds/${guildId}/roles`,
              { headers: { Authorization: `Bot ${botToken}` } }
            );
            if (guildRes.ok) {
              const roles = await guildRes.json();
              const memberRoleIds = member.roles || [];
              session.isAdmin = memberRoleIds.some(rid => {
                const role = roles.find(r => r.id === rid);
                return role && (BigInt(role.permissions) & BigInt(0x8)) === BigInt(0x8);
              });
            }
          }
        } catch (e) {
          // Bot not in guild or Discord API error - silently continue
          console.warn('Admin check failed:', e.message);
        }
      }

      return session;
    },
  },
  trustHost: true,
});

import os
from django.apps import AppConfig

class ClubsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'clubs'

    def ready(self):
        if os.environ.get("RUN_MAIN") == "true":
            from brawl_job.brawl_clubs import iniciar_monitor_en_segundo_plano
            iniciar_monitor_en_segundo_plano()

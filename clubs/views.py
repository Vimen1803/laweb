import json
import os
from pathlib import Path
from django.shortcuts import render, get_object_or_404
from django.http import Http404
from django.conf import settings # Import settings to access BASE_DIR
from django.contrib.humanize.templatetags.humanize import intcomma

# Asegúrate de que esta ruta sea correcta relativa a tu manage.py
CLUB_DATA_FILE = Path("brawl_job/club_data") / "laclubs.json"

def main_page(request):
    """
    Vista para la página principal. Renderiza el main_page.html original.
    """
    return render(request, 'clubs/main_page.html', {})

def clubs_view(request):
    """
    Vista para mostrar la lista de clubes, leyendo los datos desde laclubs.json.
    Ahora renderiza laclubs.html.
    """
    clubs_data = []
    if CLUB_DATA_FILE.exists():
        try:
            with open(CLUB_DATA_FILE, "r", encoding="utf-8") as f:
                clubs_data = json.load(f)
            print(f"DEBUG: Datos de clubes cargados exitosamente desde {CLUB_DATA_FILE}")
        except json.JSONDecodeError as e:
            print(f"ERROR: Error al decodificar JSON de {CLUB_DATA_FILE}: {e}")
            clubs_data = []
        except Exception as e:
            print(f"ERROR: Error inesperado al leer {CLUB_DATA_FILE}: {e}")
            clubs_data = []
    else:
        print(f"ADVERTENCIA: Archivo de datos de clubes no encontrado: {CLUB_DATA_FILE}")

    context = {
        'clubs': clubs_data
    }
    # Renderiza la nueva plantilla laclubs.html
    return render(request, 'clubs/laclubs.html', context)

def club_detail_view(request, club_tag):
    """
    Vista para mostrar los detalles de un club específico basado en su tag.
    Lee los datos de laclubs.json y busca el club.
    """
    clubs_data = []
    if CLUB_DATA_FILE.exists():
        try:
            with open(CLUB_DATA_FILE, "r", encoding="utf-8") as f:
                clubs_data = json.load(f)
        except json.JSONDecodeError as e:
            print(f"ERROR: Error al decodificar JSON de {CLUB_DATA_FILE} para detalle de club: {e}")
        except Exception as e:
            print(f"ERROR: Error inesperado al leer {CLUB_DATA_FILE} para detalle de club: {e}")

    # Limpiamos el '#' del club_tag que viene de la URL
    # Porque Django lo decodifica de %23 a # antes de pasarlo a la vista.
    cleaned_url_tag = club_tag.lstrip('#')

    club_found = None
    for club in clubs_data:
        # Limpiamos el '#' del tag del club que viene del JSON para la comparación
        json_club_tag_cleaned = club.get('tag', '').lstrip('#')
        
        # Ahora comparamos ambos tags limpios
        if json_club_tag_cleaned == cleaned_url_tag:
            club_found = club
            break
    
    if club_found is None:
        # Muestra el tag tal como aparece en la URL para depuración, pero sin el #
        raise Http404(f"Club con tag {cleaned_url_tag} no encontrado.") 

    context = {
        'club': club_found
    }
    return render(request, 'clubs/club_detail.html', context) # Necesitarás crear este template

def tops_home(request):
    """
    Renderiza la página principal de "Tops", mostrando información general de clubes
    y botones para las listas de top jugadores.
    """
    club_general_data = None
    # Ruta al archivo JSON de estadísticas generales de clubes
    # Asegúrate de que esta ruta sea correcta relativa a la raíz de tu proyecto Django
    json_file_path = os.path.join(settings.BASE_DIR, 'brawl_job', 'club_data', 'lageneral.json')
    
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            club_general_data = json.load(f)

    except FileNotFoundError:
        print(f"ERROR: lageneral.json no encontrado en {json_file_path}")
        # Aquí podrías añadir un mensaje en el contexto para mostrar un error en la página
    except json.JSONDecodeError:
        print(f"ERROR: No se pudo decodificar el JSON de {json_file_path}")
    except Exception as e:
        print(f"ERROR: Ocurrió un error inesperado al cargar lageneral.json: {e}")

    context = {
        'club_general_data': club_general_data,
    }
    return render(request, 'clubs/tops_home.html', context)


def top_players_list(request, limit):
    """
    Renderiza una página mostrando el Top N de jugadores basándose en 'limit'.
    Carga los datos de members.json y los filtra.
    """
    top_n_players = []
    message = f"Cargando el Top {limit} de Jugadores..."

    # Ruta al archivo JSON con todos los miembros/jugadores
    json_file_path = os.path.join(settings.BASE_DIR, 'brawl_job', 'club_data', 'members.json')

    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            all_players = json.load(f)
            
            # El script de Python ya ordena los jugadores y les asigna un "top"
            # por lo que simplemente tomamos los primeros 'limit' elementos.
            # Asegúrate de que 'limit' sea un entero para el slicing
            top_n_players = all_players[:int(limit)]
            message = f"Mostrando el Top {limit} de Jugadores:"

    except FileNotFoundError:
        message = f"ERROR: El archivo members.json no fue encontrado en {json_file_path}. Asegúrate de que el script de datos lo esté generando."
        print(message)
    except json.JSONDecodeError:
        message = f"ERROR: No se pudo decodificar el JSON de members.json. ¿Está corrupto?"
        print(message)
    except Exception as e:
        message = f"ERROR: Ocurrió un error inesperado al cargar la lista de jugadores: {e}"
        print(message)

    context = {
        'limit': limit,
        'players': top_n_players,
        'message': message,
    }
    return render(request, 'clubs/top_players_list.html', context)

def member_detail_view(request, player_tag):
    """
    Muestra los detalles de un miembro específico de Brawl Stars.
    Verifica si el usuario existe en members.json.
    Si no existe, devuelve un mensaje específico en la plantilla.
    """
    # Construye la ruta absoluta al archivo members.json
    # Asume que members.json está en clubs/data/members.json
    # Based on your tree, it looks like 'club_data' is a folder at the project root, not inside 'clubs' app.
    # If club_data is at the project root, the path would be:
    json_path = os.path.join(settings.BASE_DIR, 'brawl_job','club_data', 'members.json')
    # IF 'members.json' is INSIDE 'clubs/data/members.json', then use:
    # json_path = os.path.join(settings.BASE_DIR, 'clubs', 'data', 'members.json')
    # Please verify where your 'members.json' is located.
    # For this example, I'll assume it's in a 'data' folder INSIDE the 'clubs' app.
    # If it's truly in 'club_data' at the root as per the image, use the first json_path.
    # Let's assume it should be in 'clubs/data/members.json' for consistency with common Django practices.
    # If 'club_data' is a directory at the project root that contains members.json, then:
    # json_path = os.path.join(settings.BASE_DIR, 'club_data', 'members.json')
    # Let's stick with the assumption that your json is in the app, inside a 'data' folder for now.
    # If it's in a top-level 'club_data' directory, adjust accordingly.

    # Re-evaluating your image: 'club_data' is a top-level folder, it seems.
    # So the path to members.json would likely be:
    json_path = os.path.join(settings.BASE_DIR, 'brawl_job','club_data', 'members.json') # <-- Assuming 'club_data' is at project root.

    # Verifica si el archivo existe
    if not os.path.exists(json_path):
        context = {'error_message': f"Error interno: El archivo de datos de miembros (members.json) no se encontró en '{json_path}'."}
        return render(request, 'clubs/member_detail.html', context) # <-- UPDATED PATH HERE

    # Carga los datos desde el archivo JSON
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            members_data = json.load(f)
    except json.JSONDecodeError:
        context = {'error_message': "Error interno: El archivo members.json no es un JSON válido."}
        return render(request, 'clubs/member_detail.html', context) # <-- UPDATED PATH HERE
    except Exception as e:
        context = {'error_message': f"Error interno: Problema al leer members.json: {e}"}
        return render(request, 'clubs/member_detail.html', context) # <-- UPDATED PATH HERE

    # Normaliza el player_tag para la búsqueda
    normalized_player_tag = player_tag.lstrip('#').upper()
    normalized_player_tag_with_hash = '#' + normalized_player_tag
    
    found_member = None
    for member in members_data:
        if member.get('tag', '').upper() == normalized_player_tag_with_hash.upper():
            found_member = member
            break

    # Si el miembro no fue encontrado, pasa un mensaje de error específico a la plantilla
    if found_member is None:
        context = {'error_message': "Este usuario no pertenece a LA."}
    else:
        context = {
            'member': found_member
        }
    
    # Renderiza la plantilla HTML con el contexto (ya sea con datos del miembro o con un mensaje de error)
    return render(request, 'clubs/member_detail.html', context) # <-- UPDATED PATH HERE
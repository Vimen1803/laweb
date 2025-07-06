from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.main_page, name='main_page'),
    path('clubs/', views.clubs_view, name='clubs_list'),
    path('clubs/<str:club_tag>/', views.club_detail_view, name='club_detail'),
    path('tops/', views.tops_home, name='tops_home'),
    path('tops/<str:limit>/', views.top_players_list, name='top_players_list'),
    re_path(r'^member/(?P<player_tag>[\w#%]+)/$', views.member_detail_view, name='member_detail'),
    ]
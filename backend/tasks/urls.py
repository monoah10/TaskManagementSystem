from django.urls import path, include
from .views import RegisterView
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    TaskViewSet,
    TaskCommentViewSet,
    CommentViewSet,
    DashboardStatsView,
)

router = DefaultRouter()

router.register(
    r"categories",
    CategoryViewSet,
    basename="category"
)

router.register(
    r"tasks",
    TaskViewSet,
    basename="task"
)

router.register(
    r"comments",
    CommentViewSet,
    basename="comment"
)


urlpatterns = [

    path(
        "dashboard/stats/",
        DashboardStatsView.as_view()
    ),

    path(
        "tasks/<int:task_id>/comments/",
        TaskCommentViewSet.as_view({
            "get": "list",
            "post": "create",
        }),
    ),

    path(
        "",
        include(router.urls)
    ),

    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),
]
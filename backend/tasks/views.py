from django.db.models import Count
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, BasePermission
from .permissions import IsCommentOwner, IsAdmin, IsOwnerOrAdminOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework import generics
from .serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


from .models import Category, Task, TaskComment
from .serializers import (
    CategorySerializer,
    TaskSerializer,
    TaskCommentSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()

    serializer_class = CategorySerializer

    permission_classes = [IsAuthenticated, IsAdmin]



class TaskViewSet(viewsets.ModelViewSet):

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdminOrReadOnly]

    def get_queryset(self):
        return Task.objects.select_related(
            "category", "assigned_to", "created_by"
        ).all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskCommentViewSet(viewsets.ModelViewSet):

    serializer_class = TaskCommentSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TaskComment.objects.all()

    def perform_create(self, serializer):

        task_id = self.kwargs.get("task_id")
        serializer.save(
            task_id=task_id,
            user=self.request.user
        )

class CommentViewSet(viewsets.ModelViewSet):

    serializer_class = TaskCommentSerializer
    permission_classes = [IsAuthenticated,IsCommentOwner]

    queryset = TaskComment.objects.select_related(
        "user",
        "task"
    )

class DashboardStatsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        data = {

            "total_tasks": Task.objects.count(),

            "pending_tasks": Task.objects.filter(
                status="PENDING"
            ).count(),

            "in_progress_tasks": Task.objects.filter(
                status="IN_PROGRESS"
            ).count(),

            "completed_tasks": Task.objects.filter(
                status="COMPLETED"
            ).count(),

            "high_priority_tasks": Task.objects.filter(
                priority="HIGH"
            ).count(),
        }

        return Response(data)
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Category, Task, TaskComment


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email"
        ]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class TaskCommentSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = TaskComment
        fields = "__all__"
        read_only_fields = [
            "task",
            "user",
            "created_at",
        ]


class TaskSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    assigned_to_name = serializers.CharField(
        source="assigned_to.username",
        read_only=True
    )

    created_by_name = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    comments = TaskCommentSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Task

        fields = [
            "id",
            "title",
            "description",
            "status",
            "priority",
            "due_date",

            "category",
            "category_name",

            "assigned_to",
            "assigned_to_name",

            "created_by",
            "created_by_name",

            "comments",

            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "created_by",
            "created_at",
            "updated_at",
        ]
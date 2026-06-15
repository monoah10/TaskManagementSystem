from rest_framework.permissions import BasePermission


class IsCommentOwner(BasePermission):

    def has_object_permission(
        self,
        request,
        view,
        obj
    ):
        return obj.user == request.user


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class IsOwnerOrAdminOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):

        if request.user.is_staff or request.user.is_superuser:
            return True

        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True

        return obj.assigned_to == request.user
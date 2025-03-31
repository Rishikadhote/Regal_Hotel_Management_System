from rest_framework import viewsets, permissions, filters
from .models import Room, Customer, Booking
from .serializers import RoomSerializer, CustomerSerializer, BookingSerializer
from rest_framework.permissions import IsAuthenticated

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Enable filtering for booking data
    filter_backends = [filters.SearchFilter]
    search_fields = ['customer__name', 'room__room_type', 'check_in', 'check_out']

    def perform_create(self, serializer):
        """
        Ensure the customer is properly linked to the booking.
        """
        customer = self.request.user.customer if hasattr(self.request.user, 'customer') else None
        serializer.save(customer=customer)

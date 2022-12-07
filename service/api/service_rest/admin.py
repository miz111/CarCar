from django.contrib import admin
from .models import AutomobileVO, Technician, ServiceAppointment

admin.site.register(AutomobileVO)
admin.site.register(Technician)
admin.site.register(ServiceAppointment)

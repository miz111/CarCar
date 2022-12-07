from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    TechnicianEncoder,
    ServiceAppointmentEncoder,
)
from service_rest.models import ServiceAppointment, Technician
from django.db.models import ProtectedError


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        service_appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"service_appointments": service_appointments},
            encoder=ServiceAppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            employee_number = content["technician"]
            technician = Technician.objects.get(employee_number=employee_number)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician employee number provided."},
                status=400,
            )
        if hasattr(content, "vip_treatment"):
            del content["vip_treatment"]
        if hasattr(content, "is_finished"):
            del content["is_finished"]
        service_appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            service_appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        try:
            service_appointment = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                service_appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid service appointment ID provided."},
                status=400,
            )
    elif request.method == "DELETE":
        count, _ = ServiceAppointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        try:
            content = json.loads(request.body)
            service_appointment = ServiceAppointment.objects.get(id=pk)
            if "technician" in content:
                try:
                    technician = Technician.objects.get(
                        employee_number=content["technician"]
                    )
                    setattr(service_appointment, "technician", technician)
                except Technician.DoesNotExist:
                    return JsonResponse(
                        {"message": "Invalid Technician employee number provided."},
                        status=400,
                    )
            props = ["customer_name", "date", "time", "reason"]
            for prop in props:
                if prop in content:
                    setattr(service_appointment, prop, content[prop])
            service_appointment.save()

            return JsonResponse(
                service_appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "Service appointment does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        service_appointment = ServiceAppointment.objects.get(id=pk)
        service_appointment.change_status()
        return JsonResponse(
            service_appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )
    except ServiceAppointment.DoesNotExist:
        return JsonResponse(
            {"message": "Service appointment does not exist"},
            status=404,
        )


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not register the technician"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician employee ID provided."},
                status=400,
            )
    elif request.method == "DELETE":
        try:
            count, _ = Technician.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except ProtectedError:
            return JsonResponse(
                {"message": "That technician cannot be deleted."},
                status=400,
            )
    else:
        try:
            content = json.loads(request.body)

            technician = Technician.objects.get(id=pk)
            props = ["name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()

            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "That Technician could not be found. "})
            response.status_code = 404
            return response

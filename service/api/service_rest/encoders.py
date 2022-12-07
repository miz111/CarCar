from common.json import ModelEncoder

from .models import AutomobileVO, Technician, ServiceAppointment


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_number",
    ]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "id",
        "vin",
        "customer_name",
        "date_time",
        "technician",
        "reason",
        "vip_treatment",
        "is_finished",
    ]

    encoders = {
        "technician": TechnicianEncoder(),
    }

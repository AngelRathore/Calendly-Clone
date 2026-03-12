from datetime import datetime, timedelta

def generate_slots(start_time, end_time, duration):

    slots = []

    current = datetime.combine(datetime.today(), start_time)
    end = datetime.combine(datetime.today(), end_time)

    while current + timedelta(minutes=duration) <= end:
        slots.append(current.strftime("%H:%M"))
        current += timedelta(minutes=duration)

    return slots
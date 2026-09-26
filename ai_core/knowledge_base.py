class Frame:
    """
    Frame-based Knowledge Representation
    Syllabus Module VI
    """
    def __init__(self, name, parent=None):
        self.name = name
        self.parent = parent
        self.slots = {}

    def add_slot(self, slot_name, value):
        self.slots[slot_name] = value

    def get_slot(self, slot_name):
        if slot_name in self.slots:
            return self.slots[slot_name]
        elif self.parent:
            return self.parent.get_slot(slot_name) # Inheritance
        else:
            return None

class EmergencyKnowledgeBase:
    """
    Knowledge Base containing Emergency Types, Units, and Procedures.
    """
    def __init__(self):
        self.frames = {}
        self.setup_ontology()

    def setup_ontology(self):
        # Base Incident Frame
        incident_frame = Frame("Incident")
        incident_frame.add_slot("requires_response", True)
        self.frames["Incident"] = incident_frame

        # Specific Incidents inheriting from Incident
        fire_frame = Frame("Fire", parent=incident_frame)
        fire_frame.add_slot("required_unit_type", "FireEngine")
        fire_frame.add_slot("procedure", ["Assess Severity", "Evacuate Area", "Deploy Water Hoses"])
        self.frames["Fire"] = fire_frame

        flood_frame = Frame("Flood", parent=incident_frame)
        flood_frame.add_slot("required_unit_type", "RescueBoat")
        flood_frame.add_slot("procedure", ["Assess Water Level", "Deploy Boats", "Setup Shelters"])
        self.frames["Flood"] = flood_frame

        medical_frame = Frame("Medical", parent=incident_frame)
        medical_frame.add_slot("required_unit_type", "Ambulance")
        medical_frame.add_slot("procedure", ["Triaging", "First Aid", "Transport to Hospital"])
        self.frames["Medical"] = medical_frame

    def get_recommendation(self, incident_type):
        """Use stored knowledge to generate recommendations."""
        frame = self.frames.get(incident_type)
        if not frame:
            return "No knowledge available for this incident type."
            
        return {
            "incident_type": incident_type,
            "requires_response": frame.get_slot("requires_response"),
            "recommended_unit": frame.get_slot("required_unit_type"),
            "standard_procedure": frame.get_slot("procedure")
        }


if __name__ == "__main__":
    kb = EmergencyKnowledgeBase()
    rec = kb.get_recommendation("Fire")
    print(f"Recommendation for Fire: {rec}")

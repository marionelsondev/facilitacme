import openpyxl
from openpyxl.styles import Font
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from .models import Material, Stage

# Função para gerar relatório em PDF
def generate_material_report(material_id):
    material = Material.objects.get(id=material_id)
    stages = Stage.objects.filter(material=material)

    filename = f"{material.name}_report.pdf"
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter

    c.setFont("Helvetica-Bold", 16)
    c.drawString(30, height - 40, f"Relatório do Material: {material.name}")

    c.setFont("Helvetica", 12)
    c.drawString(30, height - 80, f"Tipo de Material: {material.get_material_type_display()}")
    c.drawString(30, height - 100, f"Rastreabilidade: {material.traceability}")

    c.drawString(30, height - 140, "Etapas:")
    y = height - 160
    for stage in stages:
        c.drawString(40, y, f"{stage.get_name_display()} - {stage.timestamp.strftime('%d-%m-%Y %H:%M:%S')}")
        y -= 20

    c.save()
    return filename

# Função para gerar relatório em XLSX
def generate_material_report_xlsx(material_id):
    material = Material.objects.get(id=material_id)
    stages = Stage.objects.filter(material=material)

    filename = f"{material.name}_report.xlsx"

    workbook = openpyxl.Workbook()
    sheet = workbook.active
    sheet.title = "Relatório de Material"

    sheet['A1'] = f"Relatório do Material: {material.name}"
    sheet['A1'].font = Font(size=16, bold=True)

    sheet['A3'] = "Tipo de Material:"
    sheet['B3'] = material.get_material_type_display()
    sheet['A4'] = "Rastreabilidade:"
    sheet['B4'] = material.traceability

    sheet['A6'] = "Etapas"
    sheet['A6'].font = Font(size=14, bold=True)
    sheet['A7'] = "Nome"
    sheet['B7'] = "Data e Hora"

    row = 8
    for stage in stages:
        sheet[f'A{row}'] = stage.get_name_display()
        sheet[f'B{row}'] = stage.timestamp.strftime('%d-%m-%Y %H:%M:%S')
        row += 1

    workbook.save(filename)
    return filename

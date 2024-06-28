import xlsxwriter
from fpdf import FPDF
from .models import Failure, Material

# Função para gerar relatório de falhas em formato XLSX
def generate_failure_report_xlsx():
    failures = Failure.objects.all()

    if not failures.exists():
        return None

    filename = 'failure_report.xlsx'
    workbook = xlsxwriter.Workbook(filename)
    worksheet = workbook.add_worksheet()

    # Defina o cabeçalho
    headers = ['ID', 'DESCRIÇÃO', 'ETAPA', 'MATERIAL']
    for col_num, header in enumerate(headers):
        worksheet.write(0, col_num, header)

    # Preencha os dados
    for row_num, failure in enumerate(failures, 1):
        worksheet.write(row_num, 0, failure.id)
        worksheet.write(row_num, 1, failure.description)
        worksheet.write(row_num, 2, failure.stage)
        worksheet.write(row_num, 3, failure.material.name)

    workbook.close()
    return filename

# Função para gerar relatório de materiais em formato PDF
def generate_material_report():
    materials = Material.objects.filter(current_stage='DISTRIBUIÇÃO')

    if not materials.exists():
        return None

    filename = 'material_report.pdf'
    pdf = FPDF()
    pdf.add_page()

    # Defina a fonte
    pdf.set_font("Arial", size=12)

    # Cabeçalho
    pdf.cell(200, 10, txt="Relatórios dos materiais que concluíram o processo", ln=True, align='C')

    # Preencha os dados
    for material in materials:
        pdf.cell(200, 10, txt=f"ID: {material.id}", ln=True)
        pdf.cell(200, 10, txt=f"MATERIAL: {material.name}", ln=True)
        pdf.cell(200, 10, txt=f"TIPO DE MATERIAL: {material.material_type}", ln=True)
        pdf.cell(200, 10, txt=f"ETAPA ATUAL: {material.current_stage}", ln=True)
        pdf.cell(200, 10, txt=f"HISTÓRICO DE ETAPAS: {material.stages_history}", ln=True)
        pdf.cell(200, 10, txt="", ln=True)  # Linha em branco

    pdf.output(filename)
    return filename
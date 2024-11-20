import pygsheets
from time import sleep

CREDENTIALS_PATH = "creds.json"
gc = pygsheets.authorize(service_account_file=CREDENTIALS_PATH)
sheetname = "Формы для заполнения"

def addToGoogleSheet(worksheet, content):
    sh = gc.open(sheetname)
    wks: pygsheets.Worksheet = sh.worksheet_by_title(worksheet)
    last_row = len(wks.get_all_values(include_tailing_empty=False, include_tailing_empty_rows=False))
    wks.insert_rows(last_row, values=content, inherit=True)

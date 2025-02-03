import pygsheets

CREDENTIALS_PATH = "creds.json"
gc = pygsheets.authorize(service_account_file=CREDENTIALS_PATH)
sheetname = "Формы для заполнения"

def addToGoogleSheet(worksheet, content):
    sh = gc.open(sheetname)
    wks: pygsheets.Worksheet = sh.worksheet_by_title(worksheet)
    last_row = len(wks.get_all_values(include_tailing_empty=False, include_tailing_empty_rows=False))
    wks.insert_rows(last_row, values=content, inherit=True)

def getFromSklad(name, size) -> int:
    sh = gc.open("Склад")
    wks: pygsheets.Worksheet = sh.worksheet_by_title("List")
    sklad = wks.get_all_values(include_tailing_empty=False, include_tailing_empty_rows=False)[1:]
    for item in sklad:
        if item[0] == name and item[1] == size:            
            return item[2]
    return -1

def decrementAmmount(name, size):
    sh = gc.open("Склад")
    wks: pygsheets.Worksheet = sh.worksheet_by_title("List")
    sklad = wks.get_all_values(include_tailing_empty=False, include_tailing_empty_rows=False)[1:]
    for row, item in enumerate(sklad):
        if item[0] == name and item[1] == size:
            if int(item[2]) <= 0:
                raise IndexError('Не осталось товара')
            c: pygsheets.Cell = wks.cell((row+2, 3)) # type: ignore
            c.set_value(int(c.value)-1)
            return c.value
    return -1

                
if __name__ == "__main__":
    # getFromSklad("Кепка", "М")
    decrementAmmount("Кепка", "M")

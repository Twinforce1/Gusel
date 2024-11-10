from fastapi import FastAPI, Request, Form, UploadFile, File
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
from pathlib import Path
import json
import shutil
import uuid

app = FastAPI()

app.mount("/static", StaticFiles(directory="."), name="static")
templates = Jinja2Templates(directory=".")

UPLOAD_DIR = Path("uploaded_photos")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

items_file_path = Path("items.json")
print(items_file_path)
if items_file_path.exists():
    print("Located items.json")
    with open(items_file_path, "r", encoding="utf-8") as f:
        items = json.load(f)
else:
    print("No items.json located")
    items = []

print(items)

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("Main/index.html", {"request": request, "items": items})

@app.get("/heroes", response_class=HTMLResponse)
async def read_heroes(request: Request):
    return templates.TemplateResponse("Hero_uk/hero_uk.html", {"request": request})

@app.get("/about", response_class=HTMLResponse)
async def read_about(request: Request):
    return templates.TemplateResponse("Inspiration/inspiration.html", {"request": request})

@app.get("/apply", response_class=HTMLResponse)
async def read_apply(request: Request):
    return templates.TemplateResponse("Form/form.html", {"request": request})

@app.get("/location", response_class=HTMLResponse)
async def read_location(request: Request):
    return templates.TemplateResponse("Schedule/schedule.html", {"request": request})

@app.get("/form_hero", response_class=HTMLResponse)
async def read_form_hero(request: Request):
    return templates.TemplateResponse("Form_hero/form_hero.html", {"request": request})

@app.get("/item/{item_id}", response_class=HTMLResponse)
async def read_item(request: Request, item_id: int):
    item = next((item for item in items if item["id"] == item_id), None)
    if item is None:
        return {"error": "Item not found"}
    return templates.TemplateResponse("Items/items.html", {"request": request, "item": item, "items": items})

@app.post("/register", response_class=HTMLResponse)
async def post_register(request: Request,
                        fullName: str = Form(...),
                        videoLink: str = Form(...),
                        position: str = Form(...),
                        preferredTeam: str = Form(...),
                        switchTeam: str = Form(...),
                        age: int = Form(...),
                        guardianName: str = Form(...),
                        guardianPhone: str = Form(...),
                        agreement: bool = Form(...)):

    return RedirectResponse(url="/success_register", status_code=303)

@app.get("/success_register", response_class=HTMLResponse)
async def read_success_register(request: Request):
    return templates.TemplateResponse("Success_register/success_register.html", {"request": request})

@app.post("/send_story", response_class=HTMLResponse)
async def post_story(request: Request,
                     birthday: str = Form(...),
                     phone_number: str = Form(...),
                     story: str = Form(...),
                     agreement: bool = Form(...),
                     photo: UploadFile = File(...)
                    ):
    photo_filename = f"{uuid.uuid4().hex}_{photo.filename}"
    photo_path = UPLOAD_DIR / photo_filename

    # Сохраняем файл на сервере
    with open(photo_path, "wb") as f:
        shutil.copyfileobj(photo.file, f)
    return RedirectResponse(url="/story_success", status_code=303)

@app.get("/story_success", response_class=HTMLResponse)
async def read_story_success(request: Request):
    return templates.TemplateResponse("Success_story/success_story.html", {"request": request})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
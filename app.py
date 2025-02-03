from fastapi import FastAPI, Request, Form, UploadFile, File, Query, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from pathlib import Path
import os
import json
import shutil
import uuid
import httpx
from spreadsheet import addToGoogleSheet

app = FastAPI()


app.mount("/static", StaticFiles(directory="."), name="static")
templates = Jinja2Templates(directory=".")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploaded_photos")
ASSETS_PATH = "./Assets"
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


@app.get("/api/teams", response_class=JSONResponse)
async def get_team(season: str = Query(...), team: str = Query(...)):
    json_path = os.path.join(ASSETS_PATH, season, team, "team.json")
    print(json_path)
    if not os.path.exists(json_path):
        print("It's here")
        raise HTTPException(status_code=404, detail="Can't find team.json")
    
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return JSONResponse(content=data)
    

@app.get("/download_images", response_class=HTMLResponse)
async def get_images(request: Request):
    return templates.TemplateResponse("Magic/index.html", {"request": request})

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

    addToGoogleSheet('Заявка на участие', [fullName, videoLink, position, preferredTeam, switchTeam, age, guardianName, "'" + guardianPhone, agreement])
    return RedirectResponse(url="/success_register", status_code=303)

@app.get("/success_register", response_class=HTMLResponse)
async def read_success_register(request: Request):
    return templates.TemplateResponse("Success_register/success_register.html", {"request": request})

@app.post("/send_story", response_class=HTMLResponse)
async def post_story(request: Request,
                     fullName: str = Form(...),
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
    addToGoogleSheet('Истории', [fullName, birthday, "'" + phone_number, story, str(photo_path)])
    return RedirectResponse(url="/story_success", status_code=303)

@app.post("/cart")
async def post_cart(request: Request,
                    name: str = Form(...),
                    surname: str = Form(...),
                    patronymic: str = Form(...),
                    clientPhone: str = Form(...),
                    email: str = Form(...),
                    notes: str = Form(...)):
    url = "http://127.0.0.1:8888/cart.php"
    fullName = " ".join([surname, name, patronymic])
    params = {"name": fullName, "phone": clientPhone, "email": email, "comment": notes}

    async with httpx.AsyncClient() as client:
        response = await client.post(url, data=params)
    try:
        return HTMLResponse(response.text)
    except:
        return "Увы"
    

@app.get("/story_success", response_class=HTMLResponse)
async def read_story_success(request: Request):
    return templates.TemplateResponse("Success_story/success_story.html", {"request": request})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

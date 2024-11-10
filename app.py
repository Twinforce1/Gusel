from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="."), name="static")

templates = Jinja2Templates(directory=".")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("Main/index.html", {"request": request})

@app.get("/heroes", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("Hero_uk/hero_uk.html", {"request": request})

@app.get("/about", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("Inspiration/inspiration.html", {"request": request})

@app.get("/apply", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("Form/form.html", {"request": request})

@app.get("/location", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("Schedule/schedule.html", {"request": request})

@app.get("/form_hero", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("Form_hero/form_hero.html", {"request": request})

@app.get("/story_success", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("Success_story/success_story.html", {"request": request})

@app.post("/register", response_class=HTMLResponse)
async def read_root(request: Request,
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
async def read_root(request: Request):
    return templates.TemplateResponse("Success_register/success_register.html", {"request": request})
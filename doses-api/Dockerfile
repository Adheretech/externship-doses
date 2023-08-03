FROM python:3.11-alpine

RUN apk add --no-cache gcc musl-dev libffi-dev

RUN pip install poetry

WORKDIR /app

COPY ./poetry.lock pyproject.toml ./

RUN poetry install --no-root

COPY ./ ./

EXPOSE 5000

CMD ["poetry", "run", "python", "./app.py"]

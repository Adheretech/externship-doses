# AdhereTech Externship Doses Project

This project mirrors a simple service orientated architecture with a single
backend and frontend. All aspects are Dockerized and will run within a
Kubernetes cluster, in this case Google Kubernetes Engine.

All of CI/CD will take place in GitHub Actions with secrets already provided
at the repository level.

-----

## GitHub Codespaces

When using Codespaces, you should will have all the required tools already
installed within the codespace. The first creation of the space will take
a couple of minutes to install dependencies. Once it is all configured please
authenticate to Google Cloud Platform:

```shell
gcloud auth login
```

And generate GCP application credentials:

```shell
gcloud auth application-default login
```

## Application Structure:

### Backend

Python Flask application that will handle GETs and POSTs while validating a JWT.

### Frontend

ReactJS application for viewing data created and stored by the API.

## Infrastructure

Krakend is used as the api gateway and webserver.
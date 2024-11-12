# Webpage of Thomas Saigre

Public link : [https://irma.math.unistra.fr/~saigre/](https://irma.math.unistra.fr/~saigre/) (or [http://thomas.saigre.fr/](http://thomas.saigre.fr/))


## Setup

Some packages are required to build the website, with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

```bash
pip install mkdocs mkdocs-material
pip install mkdocs-git-revision-date-localized-plugin
```

## Build

In dev mode :

```bash
mkdocs serve
```

To build the website :

```bash
mkdocs build
```

To run the pipeline to deploy it on IRMA server:

```bash
./build_and_upload_site.sh
```
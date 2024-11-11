
build_site()
{
    mkdocs build
}


deploy_site()
{
    rsync -avz site/ file:public_html/
    ssh file majhome
}

build_site
if [ $? -eq 0 ]; then
    deploy_site
else
    echo "Error: Failed to build the site."
fi

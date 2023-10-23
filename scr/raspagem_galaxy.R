library(magrittr)

page = "https://usegalaxy.org/api/workflows/"
json_dowload = "/download?format=json-download"

get = "https://usegalaxy.org/api/workflows?sort_by=update_time&sort_desc=true&search=is:published&skip_step_counts=true&show_published=true&show_shared=false"

get_workflows = get %>%  
  httr::GET() %>% 
  httr::content()


for(workflow in get_workflows){
  download_url = paste0(page,workflow$id,json_dowload)
  
  tryCatch({
  
  download.file(download_url,paste0(getwd(),"/Git/Doc/workflows_galaxy/",workflow$id,".json"))
  
  },
  error = function(cond){
    print(paste0("Erro em: ",download_url))
    print(cond)
  }
  )

}

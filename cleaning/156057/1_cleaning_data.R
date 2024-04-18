############## LIMPIEZA DE DATOS ###############
# obvio iba a ser en R jejeje

# ---- librerias ----
library(janitor)
library(stringi)
library(tidyverse)
library(tidytext)


# ---- lectura de datos ----
data <- read.csv("../../data/icm-00-23.csv")


# ---- limpieza de datos ----
# Primera version: ----
# se deja formato igual, solo se cambian detalles como acentos y mayusculas
clean_data <- data %>%
  # esta funcion pone los nombres de las columnas en formato estandard
  clean_names() %>%
  # renombramos la columna ano a anio jeje
  rename(anio=ano)%>%
  # viene lo denso
  mutate(
    # pasamos a minusculas
    across(c(entidad, poblacion, sexo, edad),
           stringr::str_to_lower),
    
    # primera letra en mayuscula para entidad
    entidad=str_to_title(entidad), 
    
    # eliminamos caracteres como acentos
    across(c(entidad, poblacion, sexo),
           ~ stringi::stri_trans_general(., "Latin-ASCII")),
    
    # eliminamos la palabra años para dejar el rango
    edad=stringr::str_replace_all(edad, "años", ""),
    
    # formato para Ciudad de Mexico
    entidad=stringr::str_replace_all(entidad, " De ", " de ")
  )


# Segunda version: ----
clean_data_longer <- clean_data %>%
  # pasamos a formato largo las últimas columnas 
  # se pone el nombre de las columnas en "medida"
  # el valor de cada columna ahora es "valor"
  pivot_longer(cols=c(cantidad,totales,porcentaje,tasa), 
               names_to="medida", 
               values_to="valor") %>%
  # eliminamos filas con valores NA
  filter(!is.na(valor))


# Tercera version: ----
clean_data_wider <- clean_data_longer %>%
  # pasamos a formato ancho
  # ahora vamos a tener para cada anio, sexo, edad y medida (cantidad, totales, porcentaje, tasa)
  # el valor en columnas para todas las cosas que vienen en el archivo
  pivot_wider(id_cols=c(anio, entidad,sexo, edad, medida), 
              names_from=poblacion, 
              values_from=valor) %>%
  # le volvemos a dar formato estandar a las columnas
  clean_names()

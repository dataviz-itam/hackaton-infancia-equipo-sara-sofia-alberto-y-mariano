
# Cargar paquetes
library(dplyr)
library(ggplot2)
library(tidyr)
library(lubridate)
library(readr)
library(knitr)
library(kableExtra)

# Leer datos
data <- read.csv("sofia_temp/icm-00-23_wide_Mariano.csv")

# Ver datos
head(data)

colnames(data)

# Seleccionamos las columnas de interés para trbajo infantil
data_selected <- data %>%
  select(
    anio,
    entidad,
    sexo,
    poblacion_total,
    poblacion_afrodescendiente,
    poblacion_hablante_de_lengua_indigena,
    poblacion_con_discapacidad,
    inasistencia_escolar,
    tasa_de_mortalidad_infantil,
    abandono_escolar_primaria,
    abandono_escolar_secundaria,
    abandono_escolar_media_superior,
    trabajo_infantil,
    poblacion_ocupada
  )

# Verificamos las primeras filas del nuevo dataframe para confirmar que contiene las columnas correctas
head(data_selected)

# Creamos la tabla con kable y le añadimos estilos con kableExtra
tabla_bonita <- data_selected %>%
  head(10) %>% 
  kable("html", table.attr = "style='width:100%;'") %>% 
  kable_styling(bootstrap_options = c("striped", "hover", "condensed", "responsive"))

# Mostramos la tabla
tabla_bonita

# Crear una función que calcule y muestre los porcentajes de NA para cada columna en una tabla bonita
crear_tabla_porcentaje_NA <- function(data) {
  # Calcular el porcentaje de NA por columna
  porcentaje_NA <- sapply(data, function(x) sum(is.na(x)) / length(x) * 100)

  # Convertir a dataframe para usar en kable
  tabla_porcentaje_NA <- data.frame(
    Variable = names(porcentaje_NA),
    PorcentajeNA = round(porcentaje_NA, 2)
  )

  # Crear tabla bonita
  tabla_bonita_NA <- tabla_porcentaje_NA %>%
    kable("html", table.attr = "style='width:100%;'") %>%
    kable_styling(bootstrap_options = c("striped", "hover", "condensed", "responsive")) %>%
    column_spec(1, bold = TRUE) %>%
    column_spec(2, color = ifelse(tabla_porcentaje_NA$PorcentajeNA > 0, "red", "black"))

  # Retornar la tabla
  return(tabla_bonita_NA)
}

# Aplicar la función al dataframe seleccionado
crear_tabla_porcentaje_NA(data_selected)


# Algunas visualizaciones intermedias 
ggplot(data_selected, aes(x = poblacion_total)) +
  geom_histogram(bins = 30, fill = "blue", alpha = 0.7) +
  labs(title = "Distribución de Población Total", x = "Población Total", y = "Frecuencia") +
  theme_minimal()

data_selected %>%
  group_by(anio) %>%
  summarise(trabajo_infantil = sum(trabajo_infantil, na.rm = TRUE)) %>%
  ggplot(aes(x = factor(anio), y = trabajo_infantil, fill = factor(anio))) +
  geom_bar(stat = "identity") +
  labs(title = "Trabajo Infantil por Año", x = "Año", y = "Trabajo Infantil") +
  theme_minimal()


data_selected %>%
  group_by(anio) %>%
  summarise(tasa_de_mortalidad_infantil = mean(tasa_de_mortalidad_infantil, na.rm = TRUE)) %>%
  ggplot(aes(x = anio, y = tasa_de_mortalidad_infantil)) +
  geom_line() +
  geom_point() +
  labs(title = "Tasa de Mortalidad Infantil por Año", x = "Año", y = "Tasa de Mortalidad Infantil") +
  theme_minimal()


ggplot(data_selected, aes(x = factor(anio), y = poblacion_con_discapacidad)) +
  geom_boxplot() +
  labs(title = "Distribución de Población con Discapacidad por Año", x = "Año", y = "Población con Discapacidad") +
  theme_minimal()


#  DERECHO A LA PROTECCIÓN
#  TRABAJO INFANTIL

# Filtrar para eliminar filas con NA en las variables de interés
data_filtered <- data_selected %>%
  filter(!is.na(trabajo_infantil) & !is.na(poblacion_ocupada))

# Verificar la cantidad de datos disponibles
print(paste("Filas disponibles para el análisis:", nrow(data_filtered)))
#### OJO 1782 filas disponibles de 46350 para el análisis de trabajo infantil y población ocupada

# Estadísticas descriptivas para trabajo infantil
summary_trabajo_infantil <- summary(data_filtered$trabajo_infantil)
# Estadísticas descriptivas para población ocupada
summary_poblacion_ocupada <- summary(data_filtered$poblacion_ocupada)

print("Resumen de Trabajo Infantil:")
print(summary_trabajo_infantil)

print("Resumen de Población Ocupada:")
print(summary_poblacion_ocupada)

# Calcular la correlación
correlacion <- cor(data_filtered$trabajo_infantil, data_filtered$poblacion_ocupada, use = "complete.obs")

print(paste("Correlación entre Trabajo Infantil y Población Ocupada:", correlacion))

# Scatter plot
ggplot(data_filtered, aes(x = trabajo_infantil, y = poblacion_ocupada)) +
  geom_point(aes(color = as.factor(data_filtered$anio)), alpha = 0.6) +
  geom_smooth(method = "lm", se = FALSE, color = "blue") +  # Añadir una línea de tendencia
  labs(title = "Relación entre Trabajo Infantil y Población Ocupada",
       x = "Trabajo Infantil",
       y = "Población Ocupada") +
  theme_minimal() +
  scale_color_discrete(name = "Año")

# Boxplots
# Boxplot para Trabajo Infantil
ggplot(data_filtered, aes(x = as.factor(anio), y = trabajo_infantil)) +
  geom_boxplot(fill = "lightblue") +
  labs(title = "Distribución del Trabajo Infantil por Año",
       x = "Año",
       y = "Trabajo Infantil") +
  theme_minimal()

# Boxplot para Población Ocupada
ggplot(data_filtered, aes(x = as.factor(anio), y = poblacion_ocupada)) +
  geom_boxplot(fill = "salmon") +
  labs(title = "Distribución de la Población Ocupada por Año",
       x = "Año",
       y = "Población Ocupada") +
  theme_minimal()


data_filtered %>%
  group_by(anio) %>%
  summarise(Promedio_Trabajo_Infantil = mean(trabajo_infantil, na.rm = TRUE),
            Promedio_Poblacion_Ocupada = mean(poblacion_ocupada, na.rm = TRUE)) %>%
  ggplot(aes(x = anio, y = Promedio_Trabajo_Infantil, fill = as.factor(anio))) +
  geom_bar(stat = "identity", position = "dodge") +
  geom_line(aes(y = Promedio_Poblacion_Ocupada * 0.1), color = "red", size = 1) +
  labs(title = "Promedio de Trabajo Infantil y Población Ocupada por Año",
       x = "Año",
       y = "Promedio") +
  theme_minimal()


# Evolución del Trabajo Infantil en México (2019-2022)
ggplot(data_filtered, aes(x = anio, y = trabajo_infantil)) +
  geom_line(aes(group = 1), color = "red") +
  geom_point(color = "blue") +
  labs(title = "Evolución del Trabajo Infantil en México (2019-2022)",
       x = "Año",
       y = "Trabajo Infantil") +
  theme_minimal()

# Comparación de Trabajo Infantil por Sexo (2019-2022)

# Verificar cuántas categorías únicas de 'sexo' existen en 'data_filtered'
unique_sexes <- unique(data_filtered$sexo)
print(unique_sexes) 

ggplot(data_filtered, aes(x = anio, y = trabajo_infantil, fill = sexo)) +
  geom_bar(stat = "identity", position = "dodge") +
  labs(title = "Comparación de Trabajo Infantil por Sexo (2019-2022)",
       x = "Año",
       y = "Número de Casos de Trabajo Infantil") +
  scale_fill_manual(values = c("hombre" = "blue", "mujer" = "pink", "total" = "gray")) +
  theme_minimal()

# Normalizar los datos para comparar la proporción de trabajo infantil respecto a la población ocupada
data_normalized <- data_filtered %>%
  mutate(
    Proporcion_Trabajo_Infantil = trabajo_infantil / poblacion_ocupada
  )

ggplot(data_normalized, aes(x = anio, y = Proporcion_Trabajo_Infantil, group = sexo, color = sexo)) +
  geom_line() +
  geom_point() +
  labs(
    title = "Proporción de Trabajo Infantil Respecto a la Población Ocupada por Sexo",
    x = "Año",
    y = "Proporción de Trabajo Infantil"
  ) +
  theme_minimal() +
  scale_color_manual(values = c("hombre" = "blue", "mujer" = "pink", "total" = "gray"))

# Trabajo Infantil por Entidad en México
# Crear un gráfico de barras que muestra el trabajo infantil por entidad
ggplot(data_filtered, aes(x = reorder(entidad, trabajo_infantil), y = trabajo_infantil)) +
  geom_bar(stat = "identity", fill = "steelblue") +
  coord_flip() + # Poner las entidades en el eje Y para mejor visualización
  labs(title = "Trabajo Infantil por Entidad en México",
       x = "Cantidad de Trabajo Infantil",
       y = "Entidad") +
  theme_minimal()



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

#  Mejorar el formato

tabla <- kable(head(data), "html") %>% 
  kable_styling(bootstrap_options = c("striped", "hover", "condensed"), full_width = F) %>%
  column_spec(1, bold = T, color = "red") %>% # Formatear la primera columna
  row_spec(0, bold = T, background = "#D3D3D3") # Formatear la cabecera

# Calcular la cantidad de NAs por columna
na_count <- colSums(is.na(data))

# Calcular el total de observaciones en el conjunto de datos
total_observations <- nrow(data)

# Calcular el porcentaje de NAs por columna
na_percentage <- (na_count / total_observations) * 100

# Mostrar el porcentaje de NAs
na_percentage

# Crear un gráfico de barras con el porcentaje de NAs por columna
na_percentage_df <- data.frame(
  column_name = names(na_percentage),
  na_percentage = na_percentage
)

ggplot(na_percentage_df, aes(x = reorder(column_name, -na_percentage), y = na_percentage)) +
  geom_bar(stat = "identity", fill = "steelblue") +
  coord_flip() +
  labs(
    title = "Porcentaje de NAs por columna",
    x = "Columna",
    y = "Porcentaje de NAs"
  ) +
  theme_minimal()

# Derecho a la protección 
# Trabajo infantil 

# Preparar los datos para el trabajo infantil y la población ocupada
data_analysis <- data %>%
  select(anio, trabajo_infantil, poblacion_ocupada) %>%
  mutate(
    trabajo_infantil = as.numeric(trabajo_infantil),
    poblacion_ocupada = as.numeric(poblacion_ocupada)
  ) %>%
  group_by(anio) %>%
  summarize(
    Total_Trabajo_Infantil = sum(trabajo_infantil, na.rm = TRUE),
    Total_Poblacion_Ocupada = sum(poblacion_ocupada, na.rm = TRUE)
  )

  ggplot(data_analysis, aes(x = anio)) +
  geom_line(aes(y = Total_Trabajo_Infantil, group = 1, colour = "Trabajo Infantil")) +
  geom_line(aes(y = Total_Poblacion_Ocupada, group = 1, colour = "Población Ocupada")) +
  labs(title = "Trabajo Infantil y Población Ocupada por Año",
       x = "Año",
       y = "Cantidad",
       colour = "Leyenda") +
  theme_minimal() +
  scale_colour_manual(values = c("Trabajo Infantil" = "red", "Población Ocupada" = "blue"))


## Normalizar y filtrar los datos

# Normalización de los datos a porcentajes
data_analysis <- data %>%
  filter(anio >= 2015, anio <= 2022) %>%
  mutate(
    trabajo_infantil = as.numeric(trabajo_infantil),
    poblacion_ocupada = as.numeric(poblacion_ocupada),
    Porcentaje_Trabajo_Infantil = (trabajo_infantil / poblacion_ocupada) * 100
  ) %>%
  group_by(anio) %>%
  summarize(
    Promedio_Trabajo_Infantil = mean(Porcentaje_Trabajo_Infantil, na.rm = TRUE),
    Total_Trabajo_Infantil = sum(trabajo_infantil, na.rm = TRUE),
    Total_Poblacion_Ocupada = sum(poblacion_ocupada, na.rm = TRUE)
  ) %>%
  filter(Total_Poblacion_Ocupada > 0) # Asegurar que no estamos dividiendo por cero

# Crear el gráfico con los datos reescalados
ggplot(data_analysis, aes(x = anio)) +
  geom_line(aes(y = Promedio_Trabajo_Infantil, group = 1, colour = "Trabajo Infantil")) +
  labs(title = "Porcentaje Promedio de Trabajo Infantil por Año",
       x = "Año",
       y = "Porcentaje de Trabajo Infantil (%)",
       colour = "Leyenda") +
  theme_minimal() +
  scale_colour_manual(values = c("Trabajo Infantil" = "red")) +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))


# "Derretir" los datos para tener un formato largo para ggplot2
data_melted <- reshape2::melt(data_analysis, id.vars = "anio", measure.vars = c("Total_Trabajo_Infantil", "Total_Poblacion_Ocupada"))

# Gráfico de barras
ggplot(data_melted, aes(x = anio, y = value, fill = variable)) +
  geom_bar(stat = "identity", position = "dodge") +
  scale_fill_brewer(palette = "Set1") +
  labs(
    title = "Comparación del Trabajo Infantil y la Población Ocupada por Año",
    x = "Año",
    y = "Cantidad",
    fill = "Categoría"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

# Normalizar los datos y calcular el porcentaje de trabajo infantil sobre la población ocupada
data <- data %>%
  mutate(
    anio = as.integer(anio),
    trabajo_infantil = as.numeric(trabajo_infantil),
    poblacion_ocupada = as.numeric(poblacion_ocupada)
  )

# Filtrar los datos para incluir solo los años de interés y excluir valores NA
data_filtered <- data %>%
  filter(anio >= 2015, anio <= 2022, !is.na(trabajo_infantil), !is.na(poblacion_ocupada))

# Calcular el porcentaje de trabajo infantil sobre la población ocupada
data_normalized <- data_filtered %>%
  mutate(TrabajoInfantil_Porcentaje = (trabajo_infantil / poblacion_ocupada) * 100)

# Agrupar por año y calcular el promedio del porcentaje de trabajo infantil
data_agrupada <- data_normalized %>%
  group_by(anio) %>%
  summarize(Promedio_Porcentaje_Trabajo_Infantil = mean(TrabajoInfantil_Porcentaje, na.rm = TRUE))

# Graficar los datos normalizados
ggplot(data_agrupada, aes(x = anio, y = Promedio_Porcentaje_Trabajo_Infantil)) +
  geom_col(fill = "steelblue") +
  labs(
    title = "Porcentaje Promedio de Trabajo Infantil sobre Población Ocupada por Año",
    x = "Año",
    y = "Porcentaje de Trabajo Infantil"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))


# Ok but make it pretty
# Graficar los datos normalizados con estilos lindos
ggplot(data_agrupada, aes(x = anio, y = Promedio_Porcentaje_Trabajo_Infantil, fill = as.factor(anio))) +
  geom_bar(stat = "identity", width = 0.7, show.legend = FALSE) + 
  scale_fill_brewer(palette = "Paired") + 
  theme_minimal() + 
  theme(
    plot.title = element_text(size = 20, face = "bold", hjust = 0.5),
    axis.title = element_text(size = 14, face = "bold"),
    axis.text.x = element_text(angle = 45, hjust = 1, size = 12),
    axis.text.y = element_text(size = 12),
    panel.grid.major.x = element_blank(), 
    panel.grid.minor.x = element_blank(),
    panel.grid.major.y = element_line(colour = "gray80"), 
    panel.background = element_rect(fill = "white"), 
    plot.background = element_rect(fill = "white", colour = NA) 
  ) +
  labs(
    title = "Porcentaje Promedio de Trabajo Infantil por Año",
    x = "Año",
    y = "Porcentaje (%)"
  ) +
  scale_x_continuous(breaks = seq(min(data_agrupada$anio), max(data_agrupada$anio), by = 1)) + 
  scale_y_continuous(labels = scales::percent_format()) 


ggsave("Trabajo_Infantil_Porcentaje_Promedio.png", width = 10, height = 6, dpi = 300)


colnames(data)


# Probando





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


# Use uma imagem base do .NET SDK para a fase de construção
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copie os arquivos de projeto e restaure dependências
COPY *.csproj ./
RUN dotnet restore

# Copie todos os outros arquivos e compile o aplicativo
COPY . ./
RUN dotnet publish -c Release -o out

# Use uma imagem runtime do .NET para a fase de execução
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/out .

# Expor a porta que o aplicativo vai rodar
EXPOSE 80

# Definir o comando de entrada para rodar o aplicativo
ENTRYPOINT ["dotnet", "SeuAplicativo.dll"]

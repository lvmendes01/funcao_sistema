# Use uma imagem base do .NET SDK para a fase de construção
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copie o arquivo de projeto e restaure dependências
COPY src/FI.WebAtividadeEntrevista.csproj ./
RUN dotnet restore

# Copie todos os outros arquivos e compile o aplicativo
COPY src/. .
RUN dotnet publish -c Release -o /app/out

# Use uma imagem runtime do .NET para a fase de execução
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/out .

# Expor a porta que o aplicativo vai rodar
EXPOSE 80

# Definir o comando de entrada para rodar o aplicativo
ENTRYPOINT ["dotnet", "FI.WebAtividadeEntrevista.dll"]

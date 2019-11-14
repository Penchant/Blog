FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build

# copy csproj and restore as distinct layers
WORKDIR /app
COPY *.csproj .
RUN dotnet restore

# copy everything else and build app
COPY . .
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "BlogApi.dll"]
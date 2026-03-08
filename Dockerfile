FROM hugomods/hugo:go-0.157.0 AS build
COPY . /src
RUN hugo --minify

FROM nginx:alpine
COPY --from=build /src/public /usr/share/nginx/html/

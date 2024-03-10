FROM nginx:1

ENV NGINX_ENVSUBST_TEMPLATE_DIR=/usr/share/nginx/templates \
    NGINX_ENVSUBST_OUTPUT_DIR=/usr/share/nginx/html

COPY config.js.template /usr/share/nginx/templates/
COPY favicon.ico index.html cursor_time_plugin.js get_wav_bytes.js simplepeer.min.js /usr/share/nginx/html/

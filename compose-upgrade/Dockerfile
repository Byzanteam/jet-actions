FROM alpine:3.17

RUN apk add openssh-client yq

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

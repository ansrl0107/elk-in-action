# Url Shortner
node.js + typescript를 통해 간단히 개발한 서버에 docker를 이용한 infra들을 붙이는 프로젝트입니다.

## Service
- Elasticsearch: APM, access log등 로깅 관련 data를 저장
- Mysql: 단축한 url정보를 저장
- Nginx: node에서 reverse proxy의 역할 + access log를 남김
- Elastic APM: node서버에서의 로그를 수집,분석하여 Elasticsearch에서 볼 수 있도록 함
- Filebeat: Nginx에서 남긴 access log를 Elasticsearch로 넣는 역할

## Todo
- [ ] API access logging with Elasticsearch + Filebeat + Logstash

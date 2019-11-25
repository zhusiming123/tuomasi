# FROM node:6.10.1

# LABEL anthor "huruyang@tengyue360.com"

# WORKDIR /root/app

# COPY ./package.json /root/app
# RUN npm install --registry=https://registry.npm.taobao.org


# ENV HOST=0.0.0.0

# COPY ./ /root/app

# CMD ["npm", "dev" ] 

FROM nginx

LABEL anthor "huruyang@tengyue360.com"
ADD default.conf /etc/nginx/conf.d/ 
ADD nginx.conf /etc/nginx/
WORKDIR /usr/share/nginx/html
RUN mkdir teacher-static
COPY dist /usr/share/nginx/html/teacher-static
# RUN cp teacher-static/title_logo.png ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



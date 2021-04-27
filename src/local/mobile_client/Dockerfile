FROM cirrusci/flutter

COPY . /app
WORKDIR /app

RUN rm -f .packages

RUN flutter pub get
RUN flutter clean
RUN flutter build apk

RUN mkdir mobile_app/

RUN ls build/app/outputs/apk/release/

RUN cp build/app/outputs/apk/release/app-release.apk mobile_app/client.apk


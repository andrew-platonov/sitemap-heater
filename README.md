# sitemap-heater

How to run:

- `docker compose up` — this runs one cycle of heating.

You can add this line (as an example) to crontab to run it regularly:

`0 11 * * * docker compose -f /var/www/sitemap-heater/docker-compose.yml up`
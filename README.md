# tresor-ecosystem
Run the TRESOR ecosystem as docker containers

# Setup test services in the TRESOR broker
`docker exec -i -t tresorecosystem_broker_1 /bin/bash -c "source /usr/local/rvm/scripts/rvm && RAILS_ENV=production rake tresor:setup_environment"`
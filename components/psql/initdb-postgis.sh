#!/bin/sh
POSTGRES="gosu postgres postgres"

$POSTGRES --single -E <<EOSQL
CREATE DATABASE template_postgis
UPDATE pg_database SET datistemplate = TRUE WHERE datname = 'template_postgis'
CREATE DATABASE pe_db
CREATE EXTENSION postgis
EOSQL

POSTGIS_CONFIG=/usr/share/postgresql/$PG_MAJOR/contrib/postgis-$POSTGIS_MAJOR
$POSTGRES --single template_postgis -j < $POSTGIS_CONFIG/postgis.sql
$POSTGRES --single template_postgis -j < $POSTGIS_CONFIG/spatial_ref_sys.sql
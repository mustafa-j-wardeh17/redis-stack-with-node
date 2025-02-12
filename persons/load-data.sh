for f in *.json
do
  curl -X PUT -H "Content-Type: application/json" -d "@$f" 127.0.0.1:8080/person
  echo " <- $f"
done

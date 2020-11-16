# /bin/bash

# APIキー
api_key="$1"

# 引数にAPIキーが指定されていない場合
if [ -z "$api_key" ] ; then
  echo "[ERROR]：APIキーが指定されていません。"
  exit 0
fi

# 都道府県データ
data_name="都道府県"
echo "【${data_name}】：データの取得を開始します。"
# 都道府県データを取得
pref_results=$(curl -H "X-API-KEY:${api_key}" https://opendata.resas-portal.go.jp/api/v1/prefectures)
wait

pref_result=`echo ${pref_results} | jq -c .result`

# データの取得に失敗した場合
if [ "$pref_result" = null ] ; then
  echo "【${data_name}】[ERROR]：データの取得に失敗しました。"
  exit 0
fi

echo "【${data_name}】：データの取得が完了しました。"
echo "【${data_name}】：JSONの出力を開始します。"

echo $pref_result > json/pref.json

echo "【${data_name}】：JSONの出力が完了しました。"

# 人口増減率データ
data_name="人口増減率"
echo "【${data_name}】：データの取得を開始します。"

len=$(echo $pref_result | jq length)

population_data='{}'

for i in $( seq 0 $(($len-1)) ); do
  row=$(echo $pref_result | jq .[$i])
  population_results=$(curl -H "X-API-KEY:${api_key}" "https://opendata.resas-portal.go.jp/api/v1/population/sum/perYear?cityCode=-&prefCode=$(echo $row | jq .prefCode)")
  wait
  sleep 1

  population_result=`echo ${population_results} | jq -c -r .result`

  # データの取得に失敗した場合
  if [ "$population_result" = null ] ; then
    echo "【${data_name}】[ERROR]：データの取得に失敗しました。"
    exit 0
  fi
  population_data=`echo ${population_data} | jq -c -r '. |= .+ {"'$(echo $row | jq .prefCode)'": '$(echo ${population_result})'}'`
done

echo "【${data_name}】：データの取得が完了しました。"
echo "【${data_name}】：JSONの出力を開始します。"

echo $population_data > json/population.json

echo "【${data_name}】：JSONの出力が完了しました。"

import json
import os


template = """
<!DOCTYPE HTML>
<head>
<meta charset="UTF-8">

<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
<meta property="og:title" content="Web Leach - The Manga Hideout" />
<meta property="og:image" content="/assets/emo_angel_titled_w400.png" />


<style>
	.container{min-height:80vh}
	a{text-decoration:none;color:#47beed;font-size:1.1em;font-weight:bold}
	footer{bottom:0;height:50px;opacity:.4}
	h1,h2,h3{color:#eee}
	body{padding:5px;background-color:#222}
</style>
	
<link rel="manifest" href="/manifest.webmanifest">
	<title>Home page</title>
	
</head>

<body>
	<h1>Nothing special here.</h1>
	<h2>Under construction 🚧 🏗️</h2>
	<h3>Go back</h3>
"""


def make_html(folder, file):
	H_list = os.scandir(folder)

	with open(file, 'w', encoding='utf-8') as f:
		f.write(template)
		for item in H_list:
			if item.is_dir():
				path = item.path.replace('\\', '/')
				try:
					data = json.load(open(f'{path}/index.json'))
					name = data['title']
				except:
					name = item.name

				f.write(f'<a href="{path}">{item.name}</a><br><br>')

		f.write('<footer><a>Credit</a> | <a href="/18.html">Unlisted</a> | <a>Learn More</a></footer>')
		f.write('</body>')

make_html('Hmanga', '18.html')
make_html('manga', 'index.html')


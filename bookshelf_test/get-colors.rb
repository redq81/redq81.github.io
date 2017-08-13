require	"open-uri"
require "json"
require "miro"


template_url = "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/"

file = File.read('books.json')

Miro.options[:color_count] = 1

book_list = JSON.parse(file)

image_urls = book_list.map{|i|  template_url+i["imageLink"]}

def get_image_average_color(url) 
	colors = Miro::DominantColors.new(url)
	return colors.to_hex[0]
end

images_colors = image_urls.map {|i| get_image_average_color(i)}

colored_book_list = book_list.each {|i| i[:averageColor] = images_colors[book_list.index(i)] }


File.open("books.json","w") do |f|
  f.write(colored_book_list.to_json)
end

file = File.open("text.txt")
result = []

def replace_commas(string) 
	counter= 0 
	string.split("").map{|s| if s == "," && counter <5 then  counter+=1; "-"  else s end } 
end

file.each do |line|
	result.push(replace_commas(line).join(""))
end

File.open("result.txt", "w+") do |f|
  f.puts(result)
end




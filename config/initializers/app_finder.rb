finder = "#{Rails.root}/config/finder.yml"
if File.exists? finder

  config = YAML.load_file(finder)
  config.each {|key, value| ENV[key] || ENV[key] = value.to_s}
end
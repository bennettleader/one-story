###
# Blog settings
###

# Time.zone = "UTC"

set :partials_dir, "_partials"

activate :blog do |blog|
  blog.name = "case_studies"
  # This will add a prefix to all links, template references and source paths

  blog.permalink = "/case-studies/{title}.html"
  # Matcher for blog source files
  blog.sources = "entries/case_studies/:title.html"
  # blog.taglink = "tags/{tag}.html"
  blog.layout = "case_study"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".markdown"

  # Enable pagination
   blog.paginate = true
   blog.per_page = 1
  # blog.page_link = "page/{num}"
end

activate :blog do |blog|
  blog.name = "videos"
  # This will add a prefix to all links, template references and source paths

  blog.permalink = "/projects/{title}.html"
  # Matcher for blog source files
  blog.sources = "entries/videos/:title.html"
  # blog.taglink = "tags/{tag}.html"
  blog.layout = "video"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".markdown"
  
  # Enable pagination
   blog.paginate = true
   blog.per_page = 1
  # blog.page_link = "page/{num}"
end


###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", layout: false
#
# With alternative layout
# page "/path/to/file.html", layout: :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
activate :livereload

activate :directory_indexes

# Methods defined in the helpers block are available in templates
 helpers do
   def nav_active(page)
    (current_page.url.split('/')[1] == page ? 'current' : '')
   end
   
   def next_case_study
     articles =  blog('case_studies').articles
     index = articles.find_index(current_page)
     
     if (articles.count - 1 == index)
       articles.first
     else
       articles[index + 1]
     end
   end
   
   def previous_case_study
     articles =  blog('case_studies').articles
     index = articles.find_index(current_page)
     
     if (index == 0)
       articles.last
     else
       articles[index - 1]
     end
   end
     
   def next_video
     articles =  blog('videos').articles
     index = articles.find_index(current_page)
     
     if (articles.count - 1 == index)
       articles.first
     else
       articles[index + 1]
     end
   end
   
   def previous_video
     articles =  blog('videos').articles
     index = articles.find_index(current_page)
     
     if (index == 0)
       articles.last
     else
       articles[index - 1]
     end
   end
   
   
   
 end

set :build_dir, 'tmp'

set :css_dir, 'css'

set :js_dir, 'js'

set :images_dir, 'img'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

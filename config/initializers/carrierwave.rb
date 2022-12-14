CarrierWave.configure do |config|
  config.ignore_integrity_errors = false
  config.ignore_processing_errors = false
  config.ignore_download_errors = false

  if !Rails.env.test?
    config.fog_credentials = {
      provider: "AWS",
      aws_access_key_id: ENV["AWS_ACCESS_KEY_ID"],
      aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"]
    }
    if Rails.env.production?
      config.fog_directory  = ENV["PRODUCTION_S3_BUCKET"]
    else
      config.fog_directory  = ENV["DEVELOPMENT_S3_BUCKET"]
    end
	end
end
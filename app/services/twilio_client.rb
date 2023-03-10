class TwilioClient
  attr_reader :client

  def initialize
    @client = Twilio::REST::Client.new(account_sid, auth_token)
  end

  def send_text(user)
    @client.messages.create(
      from: phone_number,
      to: user.phone_number,
      body: "Hello this is a test"
    )
  end

  def danger_text(user)
    @client.messages.create(
      from: phone_number,
      to: user.phone_number,
      body: "Your contact may be in danger, please try and contact them to make sure they are safe!"
    )
  end

  def homesafe_text(user)
    @client.messages.create(
      from: phone_number,
      to: user.phone_number,
      body: "Your Contact got home safe!"
    )
  end


  private

  def account_sid
    #"AC93d9f9cc04f07e4395ee4339d000d8a4"
    ENV.fetch("ACCOUNT_SID")
    #Rails.application.credentials.development.twilio[:account_sid]
  end

  def auth_token
    #"20fead68239a914702d6c58ba0146a20"
    ENV.fetch("AUTH_TOKEN")
    #ENV[auth_token]
    #Rails.application.credentials.development.twilio[:auth_token]
  end

  def phone_number
    #+15075656507
    ENV.fetch("PHONE_NUMBER")
    #Rails.application.credentials.development.twilio[:phone_number]
  end
end

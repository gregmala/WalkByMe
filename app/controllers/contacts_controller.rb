require "#{Rails.root}/app/services/twilio_client.rb"

class ContactsController < ApplicationController
  before_action :set_contact, only: [:show, :edit, :destroy , :update]

  def index
    @contacts = policy_scope(Contact)
  end

  def show
    @contact.user = current_user
    authorize @contact
  end

  def edit
    authorize @contact
  end

  def update
    authorize @contact
    @contact.update(contact_params)
    redirect_to user_contact_path(@contact.user, @contact)
  end

  def new
    @contact = Contact.new
    authorize @contact
    # @user = current_user
    # TwilioClient.new.send_text(@user)
    # flash[:message] = "User, #{@user.first_name}, was succesfully created!"
  end

  def create
    @contact = Contact.new(contact_params)
    @contact.user = current_user
    authorize @contact
    @contact.save
    redirect_to user_contacts_path(current_user)
  end

  def destroy
    @contact.destroy
    authorize @contact
    redirect_to user_contacts_path(current_user)
  end

  private

  def set_contact
    @contact = Contact.find(params[:id])
  end

  def contact_params
    params.require(:contact).permit(:label, :phone_number, :avatar)
  end
end

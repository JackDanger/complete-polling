require 'rails_helper'

RSpec.describe "Polls", type: :request do
  describe "GET /index" do
    subject do
      get "/polls"
    end

    it "returns http success" do
      subject
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    subject do
      post "/polls", params: { poll: { title: "T", options_attributes: [{text: '1'},{ text: '2'},{ text:'3'},{ text:'4'}]}}
    end

    it "returns http success" do
      expect { subject }.to change { PollOption.count }.by(4)
      expect(response).to have_http_status(:success)
    end
  end

end

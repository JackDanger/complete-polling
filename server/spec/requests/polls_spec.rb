require 'rails_helper'

RSpec.describe "Polls", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/polls"
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    it "returns http success" do
      post "/polls", params: { poll: { title: "T", options_attributes: [{text: '1'},{ text: '2'},{ text:'3'},{ text:'4'}]}}
      expect {
        expect(response).to have_http_status(:success)
      }.to change { PollOption.count }.by(4)
    end
  end

end

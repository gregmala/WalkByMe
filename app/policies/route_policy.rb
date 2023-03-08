class RoutePolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
  end

  def show?
    record.user == user
    # true
  end

  def new?
    record.user == user # user.present?
  end

  def update?
    record.user == user
  end

  def create?
    record.user == user
  end
end
